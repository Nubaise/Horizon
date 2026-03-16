import Image from 'next/image'
import React from 'react'
import BankCard from './BankCard'
import PlaidLink from './PlaidLink'
import Category from './Category'
import { countTransactionCategories } from '@/lib/utils'

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
  if (!user) return null;

  const categories: CategoryCount[] = countTransactionCategories(transactions);
  
  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold text-blue-500">
              {user.firstName?.[0] || 'U'}
            </span>
          </div>

          <div className="profile-details">
            <h1 className='profile-name'>
              {user.firstName} {user.lastName}
            </h1>
            <p className="profile-email">
              {user.email || ''}
            </p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Banks</h2>
          <PlaidLink user={user} variant="ghost" />
        </div>

        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className='relative z-10'>
              <BankCard 
                key={banks[0].$id}
                account={banks[0]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                <BankCard 
                  key={banks[1].$id}
                  account={banks[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}
      </section>

      {categories?.length > 0 && (
        <section className="flex flex-col gap-4 pb-8">
          <h2 className="header-2">Top Categories</h2>
          <div className="flex flex-col gap-3">
            {categories.slice(0, 3).map((category) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </section>
      )}
    </aside>
  )
}

export default RightSidebar