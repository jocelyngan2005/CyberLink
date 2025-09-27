// src/services/googleCalendar.js

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '413218401489-td2q4g9cnvoudh69fm0tketpobb7g5ah.apps.googleusercontent.com'
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || 'AIzaSyBOFGvG-_LPgrYBiy1q1Fc8z47EyWMYlZM'
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'

let tokenClient
let gapiInited = false
let gisInited = false
let initPromise = null

const waitForGoogleLibraries = () => {
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      if (window.gapi && window.google?.accounts?.oauth2) {
        clearInterval(checkInterval)
        resolve()
      }
    }, 100)
    
    // Timeout after 10 seconds
    setTimeout(() => {
      clearInterval(checkInterval)
      resolve()
    }, 10000)
  })
}

const initializeGapiClient = async () => {
  await window.gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  })
  gapiInited = true
}

const initializeGisClient = () => {
  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  })
  gisInited = true
}

const loadGoogleScripts = async () => {
  // Load gapi script
  const gapiScript = document.createElement('script')
  gapiScript.src = 'https://apis.google.com/js/api.js'
  gapiScript.async = true
  gapiScript.defer = true
  document.head.appendChild(gapiScript)

  // Load gis script
  const gisScript = document.createElement('script')
  gisScript.src = 'https://accounts.google.com/gsi/client'
  gisScript.async = true
  gisScript.defer = true
  document.head.appendChild(gisScript)

  // Wait for both scripts to load
  await waitForGoogleLibraries()

  // Initialize both clients
  if (window.gapi) {
    await new Promise((resolve) => {
      window.gapi.load('client', async () => {
        await initializeGapiClient()
        resolve()
      })
    })
  }

  if (window.google?.accounts?.oauth2) {
    initializeGisClient()
  }
}

const googleCalendarService = {
  clientId: CLIENT_ID,
  
  async init() {
    if (!initPromise) {
      initPromise = loadGoogleScripts()
    }
    await initPromise
    return gapiInited && gisInited
  },

  async signIn() {
    // Ensure libraries are loaded
    await this.init()

    if (!gapiInited || !gisInited || !tokenClient) {
      throw new Error('Google libraries not initialized. Please refresh the page.')
    }

    return new Promise((resolve, reject) => {
      try {
        tokenClient.callback = async (resp) => {
          if (resp.error !== undefined) {
            reject(resp)
          } else {
            resolve(resp)
          }
        }

        if (window.gapi.client.getToken() === null) {
          tokenClient.requestAccessToken({ prompt: 'consent' })
        } else {
          tokenClient.requestAccessToken({ prompt: '' })
        }
      } catch (err) {
        reject(err)
      }
    })
  },

  signOut() {
    const token = window.gapi.client.getToken()
    if (token !== null) {
      window.google.accounts.oauth2.revoke(token.access_token)
      window.gapi.client.setToken('')
    }
  },

  async getEvents(timeMin = new Date(), timeMax = null) {
    try {
      if (!gapiInited) {
        throw new Error('Google Calendar API not initialized')
      }

      const request = {
        calendarId: 'primary',
        timeMin: timeMin.toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 50,
        orderBy: 'startTime',
      }

      if (timeMax) {
        request.timeMax = timeMax.toISOString()
      }

      const response = await window.gapi.client.calendar.events.list(request)
      
      return response.result.items.map(event => ({
        id: event.id,
        date: event.start.dateTime ? event.start.dateTime.split('T')[0] : event.start.date,
        title: event.summary || 'No Title',
        client: 'Google Calendar',
        startTime: event.start.dateTime 
          ? new Date(event.start.dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) 
          : '00:00',
        endTime: event.end.dateTime 
          ? new Date(event.end.dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) 
          : '23:59',
        category: 'work',
        color: 'bg-green-500',
        description: event.description || 'Imported from Google Calendar',
        rate: 0
      }))
    } catch (err) {
      console.error('Error fetching events:', err)
      throw new Error('Failed to fetch calendar events')
    }
  }
}

// Auto-initialize when module loads
googleCalendarService.init().catch(console.error)

export default googleCalendarService