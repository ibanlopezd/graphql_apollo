import { CheckCircle, Lock } from 'phosphor-react'
import { format, isPast } from 'date-fns'

interface LessonProps {
    title: string
    slug: string
    availableAt: Date
    type: 'live' | 'class'
}

const Lesson = ({
    title,
    slug,
    availableAt,
    type
}: LessonProps) => {

  return (
   <a href={slug}>
        <span className="text-gray-300">
            {format(new Date(availableAt), "EEEE' · 'd' 'MMMM' · 'k'h'mm")}
        </span>
        <div
            className="rounded border border-gray-500 p-4 mt-2"
        >
            <header
                className="flex items-center justify-between"
            >
                {isPast(availableAt) ? (
                    <span className="flex items-center gap-2 text-sm text-blue-500 font-medium">
                        <CheckCircle size={20}  />
                        Released Content
                    </span>
                ): (
                    <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
                        <Lock size={20}  />
                        Coming Soon
                    </span>

                )}
                <span 
                    className="text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold"
                >
                    {type === 'live' ? 'LIVE' : 'Class'}
                </span>
            </header>

            <strong
                className="text-gray-200 mt-5 block"
            >
                {title}
            </strong>
        </div>
   </a>
  )
}

export { Lesson }