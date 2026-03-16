import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import Copy from '@/components/Copy';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.userId 
  })

  return (
    <section className='flex'>
      <div className="my-banks">
        <HeaderBox 
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activites."
        />

        <div className="space-y-4">
          <h2 className="header-2">
            Your cards
          </h2>
          <div className="flex flex-wrap gap-6">
            {accounts && accounts.data.map((a: Account) => (
              <div key={a.id} className="flex flex-col">
                <BankCard 
                  account={a}
                  userName={loggedIn?.firstName}
                />
                <Copy title={a.sharableId} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks