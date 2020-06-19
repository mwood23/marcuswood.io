/** @jsx jsx */

import { css, keyframes } from '@emotion/core'
import React, { FC, useState } from 'react'
import { animated, config, useTransition } from 'react-spring'
import { Box, Button, Input, Text, jsx } from 'theme-ui'

import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '../gatsby-plugin-theme-ui'
import styled from '../style/styled'
import { emailIsValid } from '../utils'
import { Error, Warn } from './SVG'

const stroke = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`
const scale = keyframes`
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
`
const fill = keyframes`
  100% {
    box-shadow: inset 0px 0px 0px 30px none;
  }
`

const INPUT_HEIGHT = '54px'
const INPUT_MICRO_HEIGHT = '35px'
const INPUT_HEIGHT_MOBILE = '35px'
const BUTTON_SPACING = '0px'
const BUTTON_WIDTH = '120px'
const FORM_ERROR_SIZE = '12px'
const FORM_ERROR_SIZE_MOBILE = '12px'

const Wrapper = styled(Box)`
  /* Fixed so there's no jank on success animation */
  height: 50px;
  position: relative;
  width: 100%;
`

const StyledEmailForm = styled.form<{ micro: boolean }>`
  text-align: center;
  width: 80%;
  margin: 0 auto;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }

  ${(props) =>
    props.micro &&
    css`
      width: 100%;
    `}
`

const StyledFancyInput = styled(Input)<{
  warn: boolean
  error: boolean
  micro: boolean
  onDarkBackground: boolean
}>`
  height: ${INPUT_HEIGHT};
  width: 100%;
  background: ${(props) =>
    props.onDarkBackground
      ? props.theme.colors.background
      : props.theme.colors.secondaryBackground};
  border: none;
  padding-left: 20px;
  padding-right: ${`calc(${BUTTON_WIDTH} + ${BUTTON_SPACING} + ${BUTTON_SPACING})`};
  transition: all 200ms linear;
  color: ${(props) => props.theme.colors.text};

  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    height: ${INPUT_HEIGHT_MOBILE};
    font-size: 16px;
  }

  ${(props) =>
    props.micro &&
    css`
      height: ${INPUT_MICRO_HEIGHT};
      font-size: 0.9rem;
    `}
`

const FancyInputWrapper = styled(Box)<{ micro: boolean }>`
  position: relative;
  height: ${INPUT_HEIGHT};

  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    height: ${INPUT_HEIGHT_MOBILE};
  }
`

const StatusText = styled(Box)<{ warn?: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 5px;

  svg {
    width: 14px;
    height: 14px;
    margin-right: 10px;
  }

  > div {
    font-size: ${FORM_ERROR_SIZE};
    margin-bottom: 0;
  }

  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    svg {
      width: 17px;
      height: 17px;
      margin-right: 10px;
    }

    > div {
      font-size: ${FORM_ERROR_SIZE_MOBILE};
    }
  }

  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    svg {
      width: 14px;
      height: 14px;
      margin-right: 10px;
    }

    > div {
      font-size: 12px;
    }
  }
`

const FancyInputButton = styled(Button)<{
  disabled: boolean
  micro: boolean
  submitting: boolean
}>`
  position: absolute;
  padding: 0;
  top: ${BUTTON_SPACING};
  bottom: ${BUTTON_SPACING};
  right: ${BUTTON_SPACING};
  height: ${`calc(${INPUT_HEIGHT} - ${BUTTON_SPACING} - ${BUTTON_SPACING})`};
  border: none;
  min-width: 140px;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.primary};
  }
  &:disabled {
    background-color: rgba(70, 70, 70, 0.25);
    cursor: not-allowed;
  }

  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    height: ${INPUT_HEIGHT_MOBILE};
    font-size: 16px;
    min-width: 130px;
  }

  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    min-width: 110px;
  }

  ${(props) =>
    props.micro &&
    css`
      padding: 0.4rem 0.6rem;
      display: block;
      margin: 0 auto;
      font-size: 0.9rem;
      height: ${INPUT_MICRO_HEIGHT};
    `}

  ${(props) =>
    props.submitting &&
    css`
      pointer-events: none;
    `}
`

const SubmitSuccessWrapper = styled(Box)``

const SubmitSuccessState = styled(Box)<{ micro?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  .checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: ${(props) => props.theme.colors.text};
    fill: none;
    animation: ${stroke} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }

  .checkmark {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: ${(props) => props.theme.colors.text};
    stroke-miterlimit: 10;
    box-shadow: inset 0px 0px 0px #acacac;
    animation: ${fill} 0.4s ease-in-out 0.4s forwards,
      ${scale} 0.3s ease-in-out 0.9s both;
  }

  .checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }

  > div {
    color: ${(props) => props.theme.colors.text};
    font-size: 0.8rem;
    margin: 0 0 0 1rem;
  }

  ${(props) =>
    props.micro &&
    css`
      > div {
        font-size: 0.75rem !important;
        margin: 0 0 0 0.5rem;
      }
    `}
`

const StyledLabel = styled.label<{
  micro: boolean
}>`
  display: block;
  text-align: left;

  span {
    display: block;
    font-size: 1rem;
    letter-spacing: 0.43px;
    line-height: 1.2;
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: 10px;
  }

  ${(props) =>
    props.micro &&
    css`
      width: 100%;
      text-align: center;
    `}
`

export type EmailFormProps = {
  micro?: boolean
  onDarkBackground?: boolean
}

export const EmailForm: FC<EmailFormProps> = ({
  micro = false,
  onDarkBackground = false,
}) => {
  const [email, setEmail] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<object>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    // TODO: Do the things here
    // const result = await addToMailchimp(email.trim())

    setResult({ result: 'success' })
    setSubmitting(false)
  }
  const isSuccessful = result?.result === 'success'

  const transition = useTransition(!isSuccessful, {
    from: { position: 'absolute', width: '100%', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.gentle,
  })
  const isEmailInvalid = !emailIsValid(email.trim())

  return (
    <Wrapper>
      {transition((style, item) =>
        item ? (
          // @ts-ignore
          <animated.div style={style}>
            <StyledEmailForm micro={micro} onSubmit={handleSubmit}>
              <StyledLabel micro={micro}>
                <span style={{ display: 'none' }}>Email Address</span>
                <FancyInputWrapper micro={micro}>
                  <StyledFancyInput
                    error={Boolean(emailTouched && isEmailInvalid && !result)}
                    micro={micro}
                    onBlur={() => setEmailTouched(true)}
                    onChange={(e) => setEmail(e.target.value)}
                    onDarkBackground={onDarkBackground}
                    placeholder="Email address"
                    value={email}
                    warn={emailTouched && !!result && !isSuccessful}
                  />
                  <FancyInputButton
                    disabled={isEmailInvalid}
                    micro={micro}
                    submitting={submitting}
                  >
                    {submitting ? 'Loading...' : 'Subscribe'}
                  </FancyInputButton>
                </FancyInputWrapper>
              </StyledLabel>
              {emailTouched && isEmailInvalid && !result && (
                <StatusText>
                  <Error />
                  <Text>Please enter a valid email address.</Text>
                </StatusText>
              )}
              {result && (
                <StatusText warn>
                  <Warn />
                  <Text>
                    {isSuccessful
                      ? null
                      : 'Email is not valid or you have already subscribed, please try again.'}
                  </Text>
                </StatusText>
              )}
            </StyledEmailForm>
          </animated.div>
        ) : (
          // @ts-ignore
          <animated.div style={style}>
            <SubmitSuccessWrapper>
              <SubmitSuccessState>
                <svg
                  className="checkmark"
                  viewBox="0 0 52 52"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="checkmark__circle"
                    cx="26"
                    cy="26"
                    fill="none"
                    r="25"
                  />
                  <path
                    className="checkmark__check"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    fill="none"
                  />
                </svg>

                <Text>Thank you for subscribing!</Text>
              </SubmitSuccessState>
            </SubmitSuccessWrapper>
          </animated.div>
        ),
      )}
    </Wrapper>
  )
}
