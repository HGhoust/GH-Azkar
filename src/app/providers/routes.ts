import { AboutUs } from '@/pages/AboutUs'
import { Azkar } from '@/pages/Azkar'
import { Completed } from '@/pages/Completed'
import { Home } from '@/pages/Home/ui/Home'
import { Settings } from '@/pages/Settings'
import { ROUTER_PATH } from '@/shared/config/constants'
import { createBrowserRouter } from 'react-router'

const router = createBrowserRouter([
	{
		path: ROUTER_PATH.home,
		Component: Home,
	},
	{
		path: '/:time/:id',
		Component: Azkar,
	},
	{
		path: ROUTER_PATH.completed,
		Component: Completed,
	},
	{
		path: ROUTER_PATH.settings,
		Component: Settings,
	},
	{
		path: '/about-us',
		Component: AboutUs,
	},
])

export default router
