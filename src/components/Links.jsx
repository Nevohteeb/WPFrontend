import {Routes, Route} from 'react-router-dom'

// Import Pages
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Dinosaurs from '../pages/Dinosaurs'
import Artists from '../pages/Artists'
import Genre from '../pages/Genre'
import Cart from '../pages/Cart'

// Import Components (Single Pages)
import Post from '../components/Post'
import Dinosaur from '../components/Dinosaur'
import Artist from './Artist'
import ProductList from './ProductList'

const Links = () => {
  return (
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/dinosaurs' element={<Dinosaurs/>}/>
        <Route path='/artists' element={<Artists/>}/>
        <Route path='/cart' element={<Cart/>}/>
        {/* Single pages */}
        <Route path='/dinosaur/:id' element={<Dinosaur/>}/>
        <Route path='/post/:id' element={<Post/>}/>
        <Route path='/artists/:id' element={<Artist/>}/>
        {/* Genre Page */}
        <Route path='/genre/:id' element={<Genre/>}/>
        {/* Shop Page */}
        <Route path='/shop' element={<ProductList/>}/>
    </Routes>
  )
}

export default Links
