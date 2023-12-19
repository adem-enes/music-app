import { SVGProps } from "react"
import { svgOptions } from "."
const RewindBackward = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={svgOptions.width}
        height={svgOptions.height}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            stroke={svgOptions.stroke}
            strokeWidth={svgOptions.strokeWidth}
            d="m13 8.768 6.097-4.46C20.399 3.411 22 4.58 22 6.426v11.148c0 1.847-1.6 3.015-2.903 2.118L13 15.232M2.921 10.147c-1.228.807-1.228 2.899 0 3.706l7.418 4.877c1.194.785 2.661-.237 2.661-1.853V7.123c0-1.616-1.467-2.638-2.661-1.853L2.92 10.147Z"
        />
    </svg>
)
export default RewindBackward
