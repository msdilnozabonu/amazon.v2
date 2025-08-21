import { FooterBottom } from '@/components/footers/footer-bottom'
import { FooterMiddle } from '@/components/footers/footer-middle'
import { FooterTop } from '@/components/footers/footer-top'

export const Footer = () => {
  return (
    <div className='font-titleFont'>
        <FooterTop />
        <FooterMiddle />
        <FooterBottom />
    </div>
  )
}

export default Footer