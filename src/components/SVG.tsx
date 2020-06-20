/** @jsx jsx */

import { FC, SVGProps } from 'react'
import { jsx } from 'theme-ui'

export const Error: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM13.5047 6.43353C13.2606 6.18945 12.8587 6.19558 12.6204 6.43391L9.969 9.085L7.31785 6.43391C7.07952 6.19558 6.67766 6.18945 6.43358 6.43353C6.18781 6.67931 6.18968 7.0735 6.43397 7.31779L9.085 9.969L6.43397 12.6203C6.18968 12.8646 6.18781 13.2588 6.43358 13.5046L6.51122 13.5703C6.7564 13.7451 7.10336 13.7187 7.31785 13.5042L9.969 10.853L12.6204 13.5042C12.8587 13.7425 13.2606 13.7487 13.5047 13.5046L13.571 13.4267C13.7476 13.1815 13.7241 12.8402 13.5043 12.6203L10.853 9.969L13.5043 7.31779C13.7241 7.09793 13.7476 6.75665 13.571 6.51141L13.5047 6.43353Z"
      fill="#E02020"
      fillOpacity="0.75"
      fillRule="evenodd"
    />
  </svg>
)

export const Warn: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM5.62555 9.375C5.2885 9.375 5 9.65482 5 10C5 10.3476 5.28007 10.625 5.62555 10.625H14.3745C14.7115 10.625 15 10.3452 15 10C15 9.65242 14.7199 9.375 14.3745 9.375H5.62555Z"
      fill="#ED7819"
      fillOpacity="0.75"
      fillRule="evenodd"
    />
  </svg>
)

export const Arrow: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 59 16"
    width="59"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M41.75 15.7942L59 7.99998L41.75 0.20575V6.00001H0V10H41.75V15.7942Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)
