import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RecentTransactions from '@/components/RecentTransactions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { getAccounts, getAccount } from '@/lib/actions/bank.actions'

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    return (
      <section className="home">
        <div className="home-content">
          <header className="home-header">
            <HeaderBox 
              type="greeting"
              title="Welcome"
              user="Guest"
              subtext="Please sign in to access your account."
            />
          </header>
        </div>
      </section>
    )
  }

  const accounts = await getAccounts({ userId: loggedIn.userId });
  const accountsData = accounts?.data;

  const appwriteItemId = (id as string) || accountsData?.[0]?.appwriteItemId;
  const currentPage = Number(page as string) || 1;

  const accountData = await getAccount({ appwriteItemId });

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox 
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions 
          accounts={accountsData}
          transactions={accountData?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={accountData?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  )
}

export default Home;