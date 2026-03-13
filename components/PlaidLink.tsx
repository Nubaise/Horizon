import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();

  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLinkToken = async () => {
      try {
        const data = await createLinkToken(user);
        setToken(data?.linkToken);
      } catch (error) {
        console.error('Error creating link token:', error);
      }
    }

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    setIsLoading(true);
    try {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      })

      router.push('/');
    } catch (error) {
      console.error('Error exchanging public token:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user, router])
  
  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }

  const { open, ready } = usePlaidLink(config);
  
  return (
    <>
      {variant === 'primary' ? (
        <Button
          onClick={() => open()}
          disabled={!ready || isLoading}
          className="plaidlink-primary"
        >
          {isLoading ? 'Connecting...' : 'Connect bank'}
        </Button>
      ): variant === 'ghost' ? (
        <Button
          onClick={() => open()}
          disabled={!ready || isLoading}
        >
          {isLoading ? 'Connecting...' : 'Connect bank'}
        </Button>
      ): (
        <Button
          onClick={() => open()}
          disabled={!ready || isLoading}
        >
          {isLoading ? 'Connecting...' : 'Connect bank'}
        </Button>
      )}
    </>
  )
}

export default PlaidLink