import { SVGProps } from "react"
import { svgOptions } from "."
const MusicNote = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width = {svgOptions.width}
        height={svgOptions.height}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            stroke={svgOptions.stroke}
            strokeWidth={svgOptions.strokeWidth}
            d="M9 19a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM21 17a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9 19V8M21 17V6"
        />
        <path
            stroke={svgOptions.stroke}
            strokeLinecap="round"
            strokeWidth={svgOptions.strokeWidth}
            d="m15.735 3.755-4 1.333c-1.32.44-1.98.66-2.357 1.184C9 6.796 9 7.492 9 8.882V12l12-4v-.45c0-2.533 0-3.8-.83-4.398-.831-.599-2.032-.198-4.435.603Z"
        />
    </svg>
)
export default MusicNote
