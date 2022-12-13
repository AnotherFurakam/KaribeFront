import LoginForm from "../models/loginform.interface";
import { Response } from "../models/response.interface";

const API_URL: string = import.meta.env.VITE_API_URL;

const login = async (login: LoginForm): Promise<Response<LoginForm>> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(login)
  })
  const data = await response.json()
  return data
} 

export default {
  login
}