export function buildFlowsheetPayload(nodes, edges) {
  const feedTank = nodes.find((n) => n.type === 'feedTank')
  const column = nodes.find((n) => n.type === 'distillationColumn')

  if (!feedTank) throw new Error('No Feed Tank found on the flowsheet.')
  if (!column) throw new Error('No Distillation Column found on the flowsheet.')

  const connection = edges.find(
    (e) => e.source === feedTank.id && e.target === column.id
  )
  if (!connection) throw new Error('Feed Tank is not connected to the Distillation Column.')

  const f = feedTank.data
  const c = column.data

  const waterToDistillate = parseFloat(c.waterToDistillate)
  const ethanolToDistillate = parseFloat(c.ethanolToDistillate)

  return {
    feed_stream: {
      temperature: parseFloat(f.feedTemperature),
      pressure: parseFloat(f.feedPressure),
      mass_flow: parseFloat(f.feedMassFlow),
      composition: {
        Water: parseFloat(f.waterFraction),
        Ethanol: parseFloat(f.ethanolFraction),
      },
    },
    distillate_split: {
      Water: waterToDistillate,
      Ethanol: ethanolToDistillate,
    },
    bottoms_split: {
      Water: 1 - waterToDistillate,
      Ethanol: 1 - ethanolToDistillate,
    },
    distillate_temperature: parseFloat(c.distillateTemperature),
    bottoms_temperature: parseFloat(c.bottomsTemperature),
    pressure: parseFloat(c.columnPressure),
  }
}