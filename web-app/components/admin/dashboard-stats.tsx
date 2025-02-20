import React from 'react'
import StatCard from './stat-card'

export default function DashboardStats() {
  return (
    <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Books Borrowed"
          value={145}
          color="red"
          valueChange={-2}
        />

        <StatCard
          title="Total Users"
          value={317}
          color="green"
          valueChange={4}
        />

        <StatCard
          title="Total Books"
          value={163}
          color="green"
          valueChange={2}
        />
      </div>
  )
}
