import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  useGetAllJobs()
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies")
    }
  }, []);
  return (
    <div style={{
      backgroundImage:"url('https://static.vecteezy.com/system/resources/thumbnails/011/045/293/small_2x/modern-workspace-with-laptop-tablet-coffee-cup-and-smartphone-copy-space-on-color-background-top-view-flat-lay-style-free-photo.jpg')", backgroundSize: "cover", backgroundPosition: "center",
    }}>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home
