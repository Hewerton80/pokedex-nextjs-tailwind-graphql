import Text from '../../typography/Text'

interface ProgressBarProps {
  legend: string
  value: number
  max: number
}

function ProgressBar({ legend, value, max }: ProgressBarProps) {
  const width = `${(value / max) * 100}%`
  return (
    <div className="flex items-center h-3 w-full">
      <Text className="text-xs w-32 text-black dark:text-light">{legend}</Text>
      <div className="flex relative ml-2 bg-muted w-full h-full">
        <div className="flex h-full bg-info" style={{ maxWidth: '100%', width }} />
      </div>
    </div>
  )
}

export default ProgressBar
