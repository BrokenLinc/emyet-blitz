import React from "react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const AdminOnlyCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useCurrentUser()
  if (user?.role !== "ADMIN") {
    return <div>You're not authorized to view this page.</div>
  }

  return <React.Fragment>{children}</React.Fragment>
}

export const AdminOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <React.Suspense fallback={<div>Authorizing...</div>}>
      <AdminOnlyCheck>{children}</AdminOnlyCheck>
    </React.Suspense>
  )
}
