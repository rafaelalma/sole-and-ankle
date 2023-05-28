import React from 'react'
import styled from 'styled-components/macro'

import { COLORS, WEIGHTS } from '../../constants'
import { formatPrice, pluralize, isNewShoe } from '../../utils'
import Spacer from '../Spacer'

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <article>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant === 'default' ? null : (
            <Flag variant={variant}>
              {variant === 'on-sale' ? 'Sale' : 'Just Released!'}
            </Flag>
          )}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : null}
        </Row>
      </article>
    </Link>
  )
}

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`

const ImageWrapper = styled.div`
  position: relative;
`

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`

const Flag = styled.div`
  height: 2rem;
  background-color: ${(p) =>
    p.variant === 'on-sale' ? COLORS.primary : COLORS.secondary};
  border-radius: 2px;
  width: fit-content;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${WEIGHTS.bold};
  font-size: ${14 / 16}rem;
  color: ${COLORS.white};
  line-height: 1rem;
  position: absolute;
  top: 12px;
  right: -4px;
`

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 32px;
`

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`

const Price = styled.span`
  color: ${(p) =>
    p.variant === 'on-sale' ? COLORS.gray[700] : COLORS.gray[900]};
  text-decoration-line: ${(p) =>
    p.variant === 'on-sale' ? 'line-through' : 'none'};
`

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`

export default ShoeCard
