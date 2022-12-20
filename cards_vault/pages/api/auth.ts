// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  idToken: string
  refreshToken: string
  token: string
}

interface IResponse {
  data: Data | null
  success: boolean
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
const { body, method } = req

  if(method !== 'POST') {
   return res.status(400).redirect('/')
  }

  if(!body) {
    return res.status(400).redirect('/')
  }

  const { email, password } = body

  if(!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password must be provided',
      data: null
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      idToken: '1234tokenId',
      refreshToken: '1234refresh',
      token: '1234token'
    }
  })
}
