import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry, IEntry } from '../../../models'


type Data =
  | { message: string }
  | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'El id no es valido' + id,
    });
  }
  switch (req.method) {
    case 'GET':
      return getEntry(req, res);
    case 'PUT':
      return putEntry(req, res);
    default:
      return res.status(400).json({
        message: 'Endpoint no existe',
      });
  }
}


const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { id } = req.query
    await db.connect()
    const entry = await Entry.findById(id);
    await db.disconnect()
    if (!entry) {
      return res.status(400).json({
        message: 'El id no es valido' + id,
      });
    }
    res.status(200).json(entry!)
  } catch (error) {
    await db.disconnect();
    console.log({error})
    res.status(500).json({
      message: 'Algo salio mal, revisar consola'
    });
  }
}

const putEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query
  try {
    await db.connect();
    const entry = await Entry.findById(id);
    if (!entry) {
      return res.status(400).json({
        message: 'El id no es valido' + id,
      });
    }
    const {
      description = entry.description,
      status = entry.status
    } = req.body
    const updatedEntry = await Entry.findByIdAndUpdate(id, {
      description,
      status
    }, { runValidators: true, new: true })
    await db.disconnect();
    res.status(201).json(updatedEntry!);
  } catch (error) {
    await db.disconnect();
    console.log({error})
    res.status(500).json({
      message: 'Algo salio mal, revisar consola'
    });
  }
}
