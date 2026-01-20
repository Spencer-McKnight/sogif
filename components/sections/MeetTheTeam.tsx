'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

// TODO: Replace with CMS content
const TEAM_CONTENT = {
  eyebrow: 'Leadership',
  title: 'Meet the Minds Behind',
  titleAccent: 'Your Investments',
  description: 'A team of seasoned professionals with decades of combined experience in property investment and fund management.',
  members: [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Chief Executive Officer',
      bio: '20+ years in institutional property investment',
      image: '', // TODO: Add CMS image URL
      linkedin: '#',
    },
    {
      id: 2,
      name: 'Michael Torres',
      role: 'Chief Investment Officer',
      bio: 'Former head of acquisitions at Macquarie',
      image: '',
      linkedin: '#',
    },
    {
      id: 3,
      name: 'Emma Williams',
      role: 'Head of Operations',
      bio: 'Expert in fund compliance and governance',
      image: '',
      linkedin: '#',
    },
    {
      id: 4,
      name: 'David Park',
      role: 'Portfolio Manager',
      bio: 'Specializes in commercial real estate',
      image: '',
      linkedin: '#',
    },
  ],
}

function TeamMember({ member, index }: { member: typeof TEAM_CONTENT.members[0]; index: number }) {
  return (
    <div 
      className="group relative"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Card */}
      <div className="relative bg-white rounded-3xl p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative w-full aspect-[4/5] mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-navy-700 to-navy-900">
          {member.image ? (
            <Image 
              src={member.image} 
              alt={member.name} 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Abstract Avatar Pattern */}
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full" />
                <div className="absolute inset-4 bg-cyan-400/30 rounded-full" />
                <div className="absolute inset-8 bg-cyan-400/40 rounded-full" />
              </div>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
          
          {/* LinkedIn Link */}
          <a 
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-navy-900 hover:bg-cyan-400 hover:text-navy-900 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        
        {/* Info */}
        <div>
          <h3 className="text-xl font-semibold text-navy-900 mb-1">
            {member.name}
          </h3>
          <p className="text-cyan-500 font-medium text-sm mb-2">
            {member.role}
          </p>
          <p className="text-slate-500 text-sm">
            {member.bio}
          </p>
        </div>
        
        {/* Decorative Element */}
        <div className="absolute top-6 right-6 w-3 h-3 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  )
}

export function MeetTheTeam() {
  return (
    <section className="relative py-24 md:py-32 bg-slate-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#0A2540" fillOpacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      
      {/* Decorative Shapes */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px]" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-navy-900/10 rounded-full blur-[80px]" />
      
      <Container className="relative z-10">
        <SectionHeading
          eyebrow={TEAM_CONTENT.eyebrow}
          title={
            <>
              {TEAM_CONTENT.title}{' '}
              <span className="text-cyan-500">{TEAM_CONTENT.titleAccent}</span>
            </>
          }
          description={TEAM_CONTENT.description}
        />
        
        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_CONTENT.members.map((member, index) => (
            <TeamMember key={member.id} member={member} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}

