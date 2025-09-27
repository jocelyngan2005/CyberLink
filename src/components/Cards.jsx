import React from 'react'
import { MapPin, Clock, Star, TrendingUp, Users } from 'lucide-react'

export const EventCard = ({ event, onBook }) => (
  <div className="card hover:shadow-lg transition-all duration-300 group">
    <div className="relative overflow-hidden rounded-lg mb-4">
      <img 
        src={event.image} 
        alt={event.title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {event.trending && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
          <TrendingUp size={14} />
          <span>Trending</span>
        </div>
      )}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
        RM {event.price}
      </div>
    </div>
    
    <div className="space-y-3">
      <div>
        <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{event.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <MapPin size={14} />
          <span>{event.distance}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock size={14} />
          <span>{event.time}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
          {event.category}
        </span>
        <button 
          onClick={() => onBook(event)}
          className="btn-primary text-sm py-2 px-4"
        >
          Book Now
        </button>
      </div>
    </div>
  </div>
)

export const FreelancerCard = ({ freelancer }) => (
  <div className="card hover:shadow-lg transition-all duration-300">
    <div className="flex items-center space-x-4">
      <img 
        src={freelancer.avatar} 
        alt={freelancer.name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{freelancer.name}</h3>
        <div className="flex items-center space-x-1 mt-1">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600">{freelancer.rating}</span>
          <span className="text-xs text-gray-500">({freelancer.completedJobs} jobs)</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {freelancer.skills.slice(0, 2).map((skill, index) => (
            <span key={index} className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-gray-900">RM {freelancer.hourlyRate}</div>
        <div className="text-xs text-gray-500">per hour</div>
        <div className={`text-xs font-medium mt-1 ${
          freelancer.availability === 'Available' ? 'text-green-600' : 'text-orange-600'
        }`}>
          {freelancer.availability}
        </div>
      </div>
    </div>
  </div>
)

export const SMECard = ({ sme }) => (
  <div className="card hover:shadow-lg transition-all duration-300">
    <div className="flex items-center space-x-4">
      <img 
        src={sme.logo} 
        alt={sme.name}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{sme.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{sme.category}</p>
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{sme.rating}</span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-600">{sme.distance}</span>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-600">{sme.priceRange}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {sme.specialties.slice(0, 3).map((specialty, index) => (
            <span key={index} className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded-full">
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export const JobCard = ({ job }) => (
  <div className="card hover:shadow-lg transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="font-bold text-lg text-gray-900">{job.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{job.employer}</p>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-primary-600">RM {job.hourlyRate}</div>
        <div className="text-xs text-gray-500">per hour</div>
      </div>
    </div>
    
    <p className="text-sm text-gray-700 mb-4">{job.description}</p>
    
    <div className="space-y-2 mb-4">
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <MapPin size={14} />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock size={14} />
          <span>{job.duration}</span>
        </div>
      </div>
    </div>
    
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-1 text-sm text-gray-600">
        <Users size={14} />
        <span>{job.applicants} applicants</span>
      </div>
      <button className="btn-primary text-sm py-2 px-4">
        Apply Now
      </button>
    </div>
  </div>
)

export const AlertCard = ({ alert }) => {
  const severityColors = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-orange-200 bg-orange-50',
    low: 'border-blue-200 bg-blue-50'
  }

  const severityTextColors = {
    high: 'text-red-800',
    medium: 'text-orange-800',
    low: 'text-blue-800'
  }

  return (
    <div className={`border rounded-lg p-4 ${severityColors[alert.severity]}`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className={`font-semibold ${severityTextColors[alert.severity]}`}>
          {alert.title}
        </h4>
        <span className="text-xs text-gray-500">{alert.time}</span>
      </div>
      <p className={`text-sm ${severityTextColors[alert.severity]} opacity-80`}>
        {alert.description}
      </p>
    </div>
  )
}