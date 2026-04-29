import { useFlowsheetStore } from '../store/flowsheetStore'
import { runDistillationSimulation } from '../api/simulate'
import { buildFlowsheetPayload } from '../utils/buildFlowsheetPayload'

export function useSimulation() {
  const nodes = useFlowsheetStore((s) => s.nodes)
  const edges = useFlowsheetStore((s) => s.edges)
  const setSimulationResult = useFlowsheetStore((s) => s.setSimulationResult)
  const setIsRunning = useFlowsheetStore((s) => s.setIsRunning)
  const setError = useFlowsheetStore((s) => s.setError)
  const isRunning = useFlowsheetStore((s) => s.isRunning)
  const simulationResult = useFlowsheetStore((s) => s.simulationResult)
  const error = useFlowsheetStore((s) => s.error)

  async function runSimulation() {
    setIsRunning(true)
    setError(null)
    try {
      const payload = buildFlowsheetPayload(nodes, edges)
      const result = await runDistillationSimulation(payload)
      setSimulationResult(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsRunning(false)
    }
  }

  return {
    runSimulation,
    isRunning,
    simulationResult,
    error,
  }
}