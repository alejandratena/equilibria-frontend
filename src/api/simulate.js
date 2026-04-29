import { apiPost } from './client'

export async function runDistillationSimulation(payload) {
  return apiPost('/simulate/distillation', payload)
}