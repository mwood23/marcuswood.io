/** @jsx jsx */

import { FC } from 'react'
import { Box, Image, ImageProps, Styled, Text, TextProps, jsx } from 'theme-ui'

import { createOptimizedCloudinary } from '../utils/'

type ProductHeroProps = {
  title: string
  companyName: string
  companyColor: string
  companySecondaryColor: string
  companyWebsite: string
  heroImgConfig: HeroImageProps
}

const CompanyName: FC<{ borderColor: string } & TextProps> = ({
  borderColor,
  children,
}) => (
  <Text
    sx={{
      borderBottom: `6px solid ${borderColor}`,
      marginTop: '2rem',
      fontSize: ['1.5rem', '2rem', '45px'],
      color: 'text',
      display: 'inline-block',
    }}
  >
    {children}
  </Text>
)

type HeroImageProps = ImageProps

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HeroImage: FC<
  Omit<HeroImageProps, 'ref'> & { mediumHeroImage?: boolean }
> = ({ mediumHeroImage, src, ...rest }) => (
  <Image
    src={createOptimizedCloudinary(src)}
    sx={{
      objectFit: 'contain',
      maxWidth: mediumHeroImage ? ['50%', '55%', '75%'] : ['85%', '65%', '60%'],
      height: ['auto', null, '100%'],
      margin: ['0 0 3rem 0', '5rem 0 0 0'],
      textAlign: 'center',
    }}
    {...rest}
  />
)

export const ProductHero: FC<
  ProductHeroProps & { mediumHeroImage?: boolean }
> = ({
  title,
  companyName,
  companyColor,
  //   companySecondaryColor,
  companyWebsite,
  heroImgConfig,
  mediumHeroImage,
}) => (
  <Box
    sx={{
      position: 'relative',
      height: ['85vh', '90vh'],
      display: 'flex',
      alignItems: ['flex-start', null, 'center'],
      justifyContent: ['flex-start', null, 'space-between'],
      flexDirection: ['column-reverse', null, 'row'],
      px: [2, 3, 5],
      marginBottom: '3rem',
      overflow: 'hidden',
    }}
  >
    <Box
      sx={{
        paddingRight: 4,
      }}
    >
      <Styled.h1
        sx={{
          fontSize: ['40px', '50px', '60px'],
        }}
      >
        {title}
      </Styled.h1>
      {companyName &&
        (companyWebsite ? (
          <Styled.a
            href={companyWebsite}
            sx={{ textDecoration: 'none' }}
            target="_blank"
          >
            <CompanyName borderColor={companyColor}>{companyName}</CompanyName>
          </Styled.a>
        ) : (
          <CompanyName borderColor={companyColor}>{companyName}</CompanyName>
        ))}
    </Box>
    <HeroImage mediumHeroImage={mediumHeroImage} {...heroImgConfig} />
  </Box>
)
