'use client';

import React, { useState } from 'react';
import { useMobile } from '@/hooks/useMobile';
import { Icon, Button, Card, Badge, Input, SectionHeading } from './design-system';

interface QuizAnswers {
  intent?: string;
  budget?: string;
  bedrooms?: string;
  features?: string[];
  areas?: string[];
  timeline?: string;
  name?: string;
  email?: string;
  phone?: string;
}

interface MatchedListings {
  id: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
}

const INTENT_OPTIONS = [
  'Buying first home',
  'Upgrading',
  'Downsizing',
  'Investing',
  'Relocating',
];

const BUDGET_OPTIONS = [
  'Under $300K',
  '$300-500K',
  '$500-750K',
  '$750K-1M',
  '$1M+',
];

const BEDROOM_OPTIONS = ['1-2', '3', '4', '5+'];

const FEATURE_OPTIONS = [
  'Pool',
  'Garage 3+',
  'Single Story',
  'Mountain Views',
  'Gated Community',
  'Horse Property',
  'Golf Course',
  'Near Schools',
];

const AREA_OPTIONS = [
  'Scottsdale',
  'Phoenix',
  'Cave Creek',
  'Tempe',
  'Chandler',
  'Gilbert',
];

const TIMELINE_OPTIONS = [
  'ASAP',
  '1-3 months',
  '3-6 months',
  '6-12 months',
  'Just browsing',
];

const SAMPLE_LISTINGS: MatchedListings[] = [
  {
    id: '1',
    address: '2847 N 44th St, Phoenix, AZ 85018',
    price: '$585,000',
    beds: 4,
    baths: 2.5,
    sqft: '2,450',
    image: '/api/placeholder/280/200',
  },
  {
    id: '2',
    address: '8912 E Camelback Rd, Scottsdale, AZ 85251',
    price: '$725,000',
    beds: 4,
    baths: 3,
    sqft: '3,100',
    image: '/api/placeholder/280/200',
  },
  {
    id: '3',
    address: '4521 S Desert Forest Dr, Chandler, AZ 85248',
    price: '$495,000',
    beds: 3,
    baths: 2,
    sqft: '2,200',
    image: '/api/placeholder/280/200',
  },
];

type QuizStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 'results';

export default function HomeMatchQuiz() {
  const isMobile = useMobile();
  const [currentStep, setCurrentStep] = useState<QuizStep>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const handleNext = () => {
    setSlideDirection('left');
    if (currentStep === 6) {
      setCurrentStep(7);
    } else if (currentStep === 7) {
      submitQuiz();
    } else if (currentStep < 6) {
      setCurrentStep((currentStep + 1) as QuizStep);
    }
  };

  const handleBack = () => {
    setSlideDirection('right');
    if (currentStep === 7) {
      setCurrentStep(6);
    } else if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as QuizStep);
    }
  };

  const handleAnswer = (key: keyof QuizAnswers, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleMultiSelect = (key: 'features' | 'areas', value: string) => {
    setAnswers((prev) => {
      const current = (prev[key] as string[]) || [];
      if (current.includes(value)) {
        return {
          ...prev,
          [key]: current.filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          [key]: [...current, value],
        };
      }
    });
  };

  const submitQuiz = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      });

      if (response.ok) {
        setCurrentStep('results');
      }
    } catch (error) {
      console.error('Quiz submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAnswered = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!answers.intent;
      case 2:
        return !!answers.budget;
      case 3:
        return !!answers.bedrooms;
      case 4:
        return Array.isArray(answers.features) && answers.features.length > 0;
      case 5:
        return Array.isArray(answers.areas) && answers.areas.length > 0;
      case 6:
        return !!answers.timeline;
      case 7:
        return !!answers.name && !!answers.email;
      default:
        return false;
    }
  };

  const stepCount = currentStep === 'results' ? 0 : currentStep;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--le-bg-base)',
        padding: isMobile ? '16px' : '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
        }}
      >
        {/* Progress Bar */}
        {currentStep !== 'results' && (
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
                fontSize: '14px',
                color: 'var(--le-text-secondary)',
              }}
            >
              <span>Step {stepCount} of 7</span>
              <span>{Math.round((stepCount / 7) * 100)}%</span>
            </div>
            <div
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: 'var(--le-border-subtle)',
                borderRadius: 'var(--le-radius-full)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  backgroundColor: 'var(--le-accent)',
                  width: `${(stepCount / 7) * 100}%`,
                  transition: 'width 0.3s ease-out',
                }}
              />
            </div>
          </div>
        )}

        {/* Quiz Content with Animation */}
        <div
          style={{
            animation: `slide${slideDirection === 'left' ? 'Left' : 'Right'} 0.3s ease-out`,
          }}
        >
          <style>{`
            @keyframes slideLeft {
              from {
                opacity: 0;
                transform: translateX(40px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            @keyframes slideRight {
              from {
                opacity: 0;
                transform: translateX(-40px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}</style>

          {currentStep === 1 && (
            <QuizSection
              heading="What brings you here?"
              options={INTENT_OPTIONS}
              selected={answers.intent}
              onSelect={(value) => handleAnswer('intent', value)}
            />
          )}

          {currentStep === 2 && (
            <QuizSection
              heading="What's your ideal budget?"
              options={BUDGET_OPTIONS}
              selected={answers.budget}
              onSelect={(value) => handleAnswer('budget', value)}
            />
          )}

          {currentStep === 3 && (
            <QuizSection
              heading="How many bedrooms?"
              options={BEDROOM_OPTIONS}
              selected={answers.bedrooms}
              onSelect={(value) => handleAnswer('bedrooms', value)}
            />
          )}

          {currentStep === 4 && (
            <QuizMultiSelect
              heading="Must-have features?"
              options={FEATURE_OPTIONS}
              selected={answers.features || []}
              onToggle={(value) => handleMultiSelect('features', value)}
            />
          )}

          {currentStep === 5 && (
            <QuizMultiSelect
              heading="Preferred areas?"
              options={AREA_OPTIONS}
              selected={answers.areas || []}
              onToggle={(value) => handleMultiSelect('areas', value)}
            />
          )}

          {currentStep === 6 && (
            <QuizSection
              heading="When are you looking to move?"
              options={TIMELINE_OPTIONS}
              selected={answers.timeline}
              onSelect={(value) => handleAnswer('timeline', value)}
            />
          )}

          {currentStep === 7 && (
            <QuizContactForm
              name={answers.name || ''}
              email={answers.email || ''}
              phone={answers.phone || ''}
              onNameChange={(value) => handleAnswer('name', value)}
              onEmailChange={(value) => handleAnswer('email', value)}
              onPhoneChange={(value) => handleAnswer('phone', value)}
            />
          )}

          {currentStep === 'results' && (
            <QuizResults
              answers={answers}
              listings={SAMPLE_LISTINGS}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        {currentStep !== 'results' && (
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '32px',
              justifyContent: 'space-between',
            }}
          >
            <Button
              onClick={handleBack}
              disabled={currentStep === 1}
              style={{
                flex: '0 0 auto',
                padding: '10px 20px',
                backgroundColor: currentStep === 1 ? 'var(--le-border-subtle)' : 'transparent',
                color: currentStep === 1 ? 'var(--le-text-muted)' : 'var(--le-accent)',
                border: `1px solid var(--le-border-subtle)`,
                borderRadius: 'var(--le-radius-md)',
                cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s',
              }}
            >
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isAnswered() || isSubmitting}
              style={{
                flex: '1',
                padding: '10px 20px',
                backgroundColor: isAnswered() ? 'var(--le-accent)' : 'var(--le-border-subtle)',
                color: isAnswered() ? 'white' : 'var(--le-text-muted)',
                border: 'none',
                borderRadius: 'var(--le-radius-md)',
                cursor: isAnswered() && !isSubmitting ? 'pointer' : 'not-allowed',
                fontWeight: '600',
                transition: 'all 0.2s',
              }}
            >
              {isSubmitting ? 'Submitting...' : currentStep === 7 ? 'See Results' : 'Next'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface QuizSectionProps {
  heading: string;
  options: string[];
  selected: string | undefined;
  onSelect: (value: string) => void;
}

function QuizSection({ heading, options, selected, onSelect }: QuizSectionProps) {
  return (
    <div>
      <SectionHeading
        style={{
          marginBottom: '24px',
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--le-text-primary)',
        }}
      >
        {heading}
      </SectionHeading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {options.map((option) => (
          <Card
            key={option}
            onClick={() => onSelect(option)}
            style={{
              padding: '16px',
              cursor: 'pointer',
              backgroundColor: selected === option ? 'var(--le-accent-subtle)' : 'var(--le-bg-card)',
              borderColor: selected === option ? 'var(--le-accent)' : 'var(--le-border-subtle)',
              borderWidth: '2px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: 'var(--le-radius-full)',
                border: `2px solid ${selected === option ? 'var(--le-accent)' : 'var(--le-border-subtle)'}`,
                backgroundColor: selected === option ? 'var(--le-accent)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {selected === option && (
                <Icon name="check" size={12} style={{ color: 'white' }} />
              )}
            </div>
            <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--le-text-primary)' }}>
              {option}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}

interface QuizMultiSelectProps {
  heading: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}

function QuizMultiSelect({ heading, options, selected, onToggle }: QuizMultiSelectProps) {
  return (
    <div>
      <SectionHeading
        style={{
          marginBottom: '24px',
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--le-text-primary)',
        }}
      >
        {heading}
      </SectionHeading>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
        {options.map((option) => (
          <Card
            key={option}
            onClick={() => onToggle(option)}
            style={{
              padding: '12px',
              cursor: 'pointer',
              backgroundColor: selected.includes(option) ? 'var(--le-accent-subtle)' : 'var(--le-bg-card)',
              borderColor: selected.includes(option) ? 'var(--le-accent)' : 'var(--le-border-subtle)',
              borderWidth: '2px',
              transition: 'all 0.2s',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--le-text-primary)' }}>
              {option}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}

interface QuizContactFormProps {
  name: string;
  email: string;
  phone: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

function QuizContactForm({
  name,
  email,
  phone,
  onNameChange,
  onEmailChange,
  onPhoneChange,
}: QuizContactFormProps) {
  return (
    <div>
      <SectionHeading
        style={{
          marginBottom: '24px',
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--le-text-primary)',
        }}
      >
        Almost there! Tell us how to reach you.
      </SectionHeading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--le-text-primary)' }}>
            Full Name
          </label>
          <Input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '14px',
              borderRadius: 'var(--le-radius-md)',
              border: '1px solid var(--le-border-subtle)',
              backgroundColor: 'var(--le-bg-card)',
              color: 'var(--le-text-primary)',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--le-text-primary)' }}>
            Email *
          </label>
          <Input
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '14px',
              borderRadius: 'var(--le-radius-md)',
              border: '1px solid var(--le-border-subtle)',
              backgroundColor: 'var(--le-bg-card)',
              color: 'var(--le-text-primary)',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--le-text-primary)' }}>
            Phone (optional)
          </label>
          <Input
            type="tel"
            placeholder="(555) 000-0000"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '14px',
              borderRadius: 'var(--le-radius-md)',
              border: '1px solid var(--le-border-subtle)',
              backgroundColor: 'var(--le-bg-card)',
              color: 'var(--le-text-primary)',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface QuizResultsProps {
  answers: QuizAnswers;
  listings: MatchedListings[];
}

function QuizResults({ answers, listings }: QuizResultsProps) {
  const matchCount = listings.length;

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: '700',
            color: 'var(--le-text-primary)',
            marginBottom: '8px',
          }}
        >
          Your Perfect Match Profile
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--le-text-secondary)' }}>
          Based on your preferences, we found {matchCount} properties that match!
        </p>
      </div>

      <Card
        style={{
          padding: '20px',
          backgroundColor: 'var(--le-accent-subtle)',
          borderColor: 'var(--le-accent)',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', fontSize: '14px' }}>
          <div>
            <span style={{ color: 'var(--le-text-secondary)', fontWeight: '600' }}>Intent:</span>
            <p style={{ margin: '4px 0 0 0', color: 'var(--le-text-primary)', fontWeight: '600' }}>
              {answers.intent}
            </p>
          </div>
          <div>
            <span style={{ color: 'var(--le-text-secondary)', fontWeight: '600' }}>Budget:</span>
            <p style={{ margin: '4px 0 0 0', color: 'var(--le-text-primary)', fontWeight: '600' }}>
              {answers.budget}
            </p>
          </div>
          <div>
            <span style={{ color: 'var(--le-text-secondary)', fontWeight: '600' }}>Bedrooms:</span>
            <p style={{ margin: '4px 0 0 0', color: 'var(--le-text-primary)', fontWeight: '600' }}>
              {answers.bedrooms}
            </p>
          </div>
          <div>
            <span style={{ color: 'var(--le-text-secondary)', fontWeight: '600' }}>Timeline:</span>
            <p style={{ margin: '4px 0 0 0', color: 'var(--le-text-primary)', fontWeight: '600' }}>
              {answers.timeline}
            </p>
          </div>
        </div>
      </Card>

      <h3
        style={{
          fontSize: '18px',
          fontWeight: '700',
          color: 'var(--le-text-primary)',
          marginBottom: '16px',
        }}
      >
        Sample Matches
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {listings.map((listing) => (
          <Card
            key={listing.id}
            style={{
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div
              style={{
                width: '100%',
                height: '160px',
                backgroundColor: 'var(--le-border-subtle)',
                marginBottom: '12px',
                borderRadius: 'var(--le-radius-sm)',
              }}
            />
            <div style={{ padding: '0 12px' }}>
              <p style={{ fontSize: '12px', color: 'var(--le-text-secondary)', margin: '0 0 4px 0' }}>
                {listing.address.split(',')[0]}
              </p>
              <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--le-accent)', margin: '0 0 8px 0' }}>
                {listing.price}
              </p>
              <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: 'var(--le-text-secondary)' }}>
                <span>{listing.beds} bed</span>
                <span>•</span>
                <span>{listing.baths} bath</span>
                <span>•</span>
                <span>{listing.sqft} sqft</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Button
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: 'var(--le-accent)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--le-radius-md)',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'var(--le-accent-dark)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'var(--le-accent)';
          }}
        >
          See All {matchCount} Matches
        </Button>

        <Button
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: 'transparent',
            color: 'var(--le-accent)',
            border: '2px solid var(--le-accent)',
            borderRadius: 'var(--le-radius-md)',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'var(--le-accent-subtle)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'transparent';
          }}
        >
          Get Personalized Recommendations
        </Button>
      </div>
    </div>
  );
}
