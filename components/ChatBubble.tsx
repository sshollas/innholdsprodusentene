interface ChatBubbleProps {
  message: string
  sender: string
  time: string
  side: 'left' | 'right'
}

export function ChatBubble({ message, sender, time, side }: ChatBubbleProps) {
  const isRight = side === 'right'

  return (
    <div
      className={`not-prose flex flex-col gap-0.5 my-1 ${isRight ? 'items-end' : 'items-start'}`}
    >
      <span className="text-xs font-medium text-gray-500 px-2">{sender}</span>
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2.5 shadow-sm ${
          isRight
            ? 'bg-blue-500 text-white rounded-tr-md'
            : 'bg-gray-100 text-gray-900 rounded-tl-md'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap m-0">{message}</p>
      </div>
      <span className="text-[11px] text-gray-400 px-2">{time}</span>
    </div>
  )
}

export function ChatThread({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-8 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-5 flex flex-col gap-1">
      {children}
    </div>
  )
}
