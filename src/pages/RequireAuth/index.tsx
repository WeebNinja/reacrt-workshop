import useAuth from '@/hook'
import { restoreState } from '@/store/slices/authSlice'
import { useAppDispatch } from '@/store/store'
import { constant } from '@/utils/constant'
import { getLocalObject } from '@/utils/localHandler'
import { useEffect, useMemo } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'


const RequireAuth = () => {
  const location = useLocation()
  const { auth } = useAuth()
  const dispath = useAppDispatch()

  useEffect(() => {
    if(auth){
      const restore = getLocalObject(constant.STROAGE_TOKEN)
      dispath(restoreState(restore))
    }
  }, [])

  const requireAuth = useMemo(() => {
    return auth ? (
      <Outlet />
    ) : (
      <Navigate to='/signin' state={{ from: location }} replace />
    )
  }, [])

  return requireAuth
}

export default RequireAuth