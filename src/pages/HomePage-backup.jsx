import Banner from '@/components/home/banner'
import Products from '@/components/home/products'

const Home = () => {
    return (
        <div>
            <Banner />
            <div className='w-full -mt-14 xl:-mt-36 py-10'>
                <Products />
            </div>
        </div>
    )
}

export default Home