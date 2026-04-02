'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useConsumer } from '@/contexts/ConsumerAuthContext';
import { useConsumerFeatures } from '@/hooks/useConsumerFeatures';
import { useMobile } from '@/hooks/useMobile';
import { Card, Button, Input, Icon } from '@/components/design-system';
import PublicShell from '@/components/PublicShell';

// ═══════════════════════════════════════════════════════════
// Account page: Consumer login/signup with saved searches
// and favorite listings display
// ═══════════════════════════════════════════════════════════

export default function AccountPage() {
  const router = useRouter();
  const isMobile = useMobile();
  const { user, profile, loading, signIn, signUp, signOut } = useConsumer();
  const { savedSearches, savedListings } = useConsumerFeatures();

  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If logged in, show account details
  if (!loading && user && profile) {
    return (
      <PublicShell>
        <div style={{ minHeight: '100vh', background: 'var(--le-bg-page)' }}>
          <div
            className="le-container"
            style={{
              paddingTop: 80,
              paddingBottom: 80,
            }}
          >
            <div
              style={{
                maxWidth: 600,
                margin: '0 auto',
              }}
            >
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <h1
                  style={{
                    fontSize: isMobile ? 28 : 36,
                    fontWeight: 700,
                    color: 'var(--le-text-primary)',
                    marginBottom: 8,
                  }}
                >
                  Your Home Search Account
                </h1>
                <p
                  style={{
                    fontSize: 16,
                    color: 'var(--le-text-secondary)',
                  }}
                >
                  Welcome back, {profile.name}
                </p>
              </div>

              {/* Profile card */}
              <Card
                style={{
                  padding: 24,
                  marginBottom: 24,
                }}
              >
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--le-text-tertiary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Profile Information
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <p style={{ fontSize: 12, color: 'var(--le-text-tertiary)', marginBottom: 4 }}>Name</p>
                      <p style={{ fontSize: 16, color: 'var(--le-text-primary)' }}>{profile.name}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 12, color: 'var(--le-text-tertiary)', marginBottom: 4 }}>Email</p>
                      <p style={{ fontSize: 16, color: 'var(--le-text-primary)' }}>{profile.email}</p>
                    </div>
                    {profile.phone && (
                      <div>
                        <p style={{ fontSize: 12, color: 'var(--le-text-tertiary)', marginBottom: 4 }}>Phone</p>
                        <p style={{ fontSize: 16, color: 'var(--le-text-primary)' }}>{profile.phone}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--le-border-subtle)', paddingTop: 24 }}>
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={signOut}
                  >
                    Sign Out
                  </Button>
                </div>
              </Card>

              {/* Saved searches */}
              <Card style={{ padding: 24, marginBottom: 24 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--le-text-tertiary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Saved Searches ({savedSearches.length})
                </h2>
                {savedSearches.length === 0 ? (
                  <p style={{ fontSize: 14, color: 'var(--le-text-secondary)' }}>
                    No saved searches yet. Start exploring homes and save your searches to get updates.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {savedSearches.map((search: any) => (
                      <div
                        key={search.id}
                        style={{
                          padding: 12,
                          background: 'var(--le-bg-surface-2)',
                          borderRadius: 'var(--le-radius-md)',
                          fontSize: 14,
                          color: 'var(--le-text-primary)',
                        }}
                      >
                        {search.name}
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Favorite listings */}
              <Card style={{ padding: 24 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--le-text-tertiary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Favorite Listings ({savedListings.length})
                </h2>
                {savedListings.length === 0 ? (
                  <p style={{ fontSize: 14, color: 'var(--le-text-secondary)' }}>
                    No favorite listings yet. Browse our listings and save your favorites.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {savedListings.map((listingId: string) => (
                      <div
                        key={listingId}
                        style={{
                          padding: 12,
                          background: 'var(--le-bg-surface-2)',
                          borderRadius: 'var(--le-radius-md)',
                          fontSize: 14,
                          color: 'var(--le-text-primary)',
                        }}
                      >
                        Listing {listingId}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </PublicShell>
    );
  }

  // Loading state
  if (loading) {
    return (
      <PublicShell>
        <div style={{ minHeight: '100vh', background: 'var(--le-bg-page)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--le-text-secondary)' }}>Loading...</p>
          </div>
        </div>
      </PublicShell>
    );
  }

  // Sign in/sign up form
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await signIn(email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await signUp(name, email, password);
      setName('');
      setEmail('');
      setPassword('');
      setTab('signin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicShell>
      <div style={{ minHeight: '100vh', background: 'var(--le-bg-page)' }}>
        <div
          className="le-container"
          style={{
            paddingTop: 80,
            paddingBottom: 80,
          }}
        >
          <div
            style={{
              maxWidth: 500,
              margin: '0 auto',
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h1
                style={{
                  fontSize: isMobile ? 28 : 36,
                  fontWeight: 700,
                  color: 'var(--le-text-primary)',
                  marginBottom: 8,
                }}
              >
                Your Home Search Account
              </h1>
              <p
                style={{
                  fontSize: 16,
                  color: 'var(--le-text-secondary)',
                }}
              >
                Save searches, favorite homes, and get personalized alerts
              </p>
            </div>

            {/* Tab buttons */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
              <button
                onClick={() => {
                  setTab('signin');
                  setError('');
                }}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  fontSize: 14,
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: 'var(--le-radius-md)',
                  cursor: 'pointer',
                  background: tab === 'signin' ? 'var(--le-primary)' : 'var(--le-bg-surface-2)',
                  color: tab === 'signin' ? '#ffffff' : 'var(--le-text-primary)',
                  transition: 'all var(--le-transition-fast)',
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setTab('signup');
                  setError('');
                }}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  fontSize: 14,
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: 'var(--le-radius-md)',
                  cursor: 'pointer',
                  background: tab === 'signup' ? 'var(--le-primary)' : 'var(--le-bg-surface-2)',
                  color: tab === 'signup' ? '#ffffff' : 'var(--le-text-primary)',
                  transition: 'all var(--le-transition-fast)',
                }}
              >
                Create Account
              </button>
            </div>

            {/* Sign In Tab */}
            {tab === 'signin' && (
              <Card style={{ padding: 32 }}>
                <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  {error && (
                    <div style={{ padding: 12, background: 'rgba(255,59,48,0.1)', borderRadius: 'var(--le-radius-md)', color: '#ff3b30', fontSize: 13 }}>
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--le-border-subtle)' }} />
                    <span style={{ fontSize: 12, color: 'var(--le-text-tertiary)' }}>or</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--le-border-subtle)' }} />
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    fullWidth
                    icon="globe"
                  >
                    Continue with Google
                  </Button>
                </form>
              </Card>
            )}

            {/* Sign Up Tab */}
            {tab === 'signup' && (
              <Card style={{ padding: 32 }}>
                <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  {error && (
                    <div style={{ padding: 12, background: 'rgba(255,59,48,0.1)', borderRadius: 'var(--le-radius-md)', color: '#ff3b30', fontSize: 13 }}>
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating account...' : 'Create Account'}
                  </Button>

                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--le-border-subtle)' }} />
                    <span style={{ fontSize: 12, color: 'var(--le-text-tertiary)' }}>or</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--le-border-subtle)' }} />
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    fullWidth
                    icon="globe"
                  >
                    Continue with Google
                  </Button>

                  <p style={{ fontSize: 12, color: 'var(--le-text-tertiary)', textAlign: 'center' }}>
                    By creating an account, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
