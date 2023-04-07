import {FC, PropsWithChildren} from 'react'

const ResponsiveGrid: FC<PropsWithChildren> = ({children}) => {
	return <div className='responsiveGrid'>{children}</div>
}

export default ResponsiveGrid
