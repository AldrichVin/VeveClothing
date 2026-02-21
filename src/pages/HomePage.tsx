import { Nav } from '../components/Nav/Nav'
import { Hero } from '../components/Hero/Hero'
import { BrandStatement } from '../components/Sections/BrandStatement'
import { NewArrivals } from '../components/Sections/NewArrivals'
import { CampaignBanner } from '../components/Sections/CampaignBanner'
import { ShopByCategory } from '../components/Sections/ShopByCategory'
import { Footer } from '../components/Sections/Footer'

export const HomePage = () => {
  return (
    <>
      <Nav />
      <Hero />
      <BrandStatement />
      <NewArrivals />
      <CampaignBanner />
      <ShopByCategory />
      <Footer />
    </>
  )
}
