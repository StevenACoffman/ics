import { expect } from 'chai'
import {
  formatEvent,
  buildEvent
} from '../../src/pipeline'

describe('pipeline.formatEvent', () => {
  describe('.formatEvent', () => {
    it('returns null if ics flag is not passed as an attribute', () => {
      const event = formatEvent()
      expect(event).to.equal(null)
    })
    it('writes default values when no attributes passed', () => {
      const event = buildEvent()
      const formattedEvent = formatEvent(event)
      expect(formattedEvent).to.contain('BEGIN:VCALENDAR')
      expect(formattedEvent).to.contain('VERSION:2.0')
      expect(formattedEvent).to.contain('PRODID:adamgibbons/ics')
      expect(formattedEvent).to.contain('BEGIN:VEVENT')
      expect(formattedEvent).to.contain('SUMMARY:Untitled event')
      expect(formattedEvent).to.contain('UID:')
      expect(formattedEvent).to.contain('DTSTART:')
      expect(formattedEvent).to.contain('DTSTAMP:20')
      expect(formattedEvent).to.contain('END:VEVENT')
      expect(formattedEvent).to.contain('END:VCALENDAR')
    })
    it('writes a title', () => {
      const event = buildEvent({ title: 'foo bar' })
      const formattedEvent = formatEvent(event)
      expect(formattedEvent).to.contain('SUMMARY:foo bar')
    })
    it('writes a description', () => {
      const event = buildEvent({ description: 'bar baz' })
      const formattedEvent = formatEvent(event)
      expect(formattedEvent).to.contain('DESCRIPTION:bar baz')
    })
    it('writes a url', () => {
      const event = buildEvent({ url: 'http://www.example.com/' })
      const formattedEvent = formatEvent(event)
      expect(formattedEvent).to.contain('URL:http://www.example.com/')
    })
    it('writes a geolocation', () => {
      const event = buildEvent({ geolocation: { lat: 1.234, lon: -9.876 } })
      const formattedEvent = formatEvent(event)
      expect(formattedEvent).to.contain('GEO:1.234;-9.876')
    })
    it('writes a location', () => {
      const event = buildEvent({ location: 'Folsom Field, University of Colorado at Boulder' })
      const formattedEvent = formatEvent(event)
      expect(formattedEvent).to.contain('LOCATION:Folsom Field, University of Colorado at Boulder')
    })
    it('writes a status', () => {
      const event = buildEvent({ status: 'tentative' })
      const formattedEvent = formatEvent(event)
      expect(formattedEvent).to.contain('STATUS:tentative')
    })
    it('writes categories', () => {
      const event = buildEvent({ categories: ['boulder', 'running'] })
      const formattedEvent = formatEvent(event)
      expect(formattedEvent).to.contain('CATEGORIES:boulder,running')
    })
    it('writes attendees', () => {
      const event = buildEvent({ attendees: [
        {name: 'Adam Gibbons', email: 'adam@example.com'},
        {name: 'Brittany Seaton', email: 'brittany@example.com'}
      ]})
      const formattedEvent = formatEvent(event)
      expect(formattedEvent).to.contain('ATTENDEE;CN=Adam Gibbons:mailto:adam@example.com')
      expect(formattedEvent).to.contain('ATTENDEE;CN=Brittany Seaton:mailto:brittany@example.com')
    })
    it('writes an organizer', () => {
      const event = buildEvent({ organizer: {
        name: 'Adam Gibbons',
        email: 'adam@example.com'
      }})
      const formattedEvent = formatEvent(event)
      expect(formattedEvent).to.contain('ORGANIZER;CN=Adam Gibbons:mailto:adam@example.com')
    })
    it('writes an alarm', () => {
      const event = buildEvent({ alarms: [{
        action: 'audio',
        trigger: [1997, 2, 17, 1, 30],
        repeat: '4',
        duration: [0, 15],
        attach: 'ftp://example.com/pub/sounds/bell-01.aud'
      }]})
      const formattedEvent = formatEvent(event)
      expect(formattedEvent).to.contain('BEGIN:VALARM')
      // expect(formattedEvent).to.contain('TRIGGER;VALUE=DATE-TIME:19970317T083000Z')
      // expect(formattedEvent).to.contain('REPEAT:4')
      // expect(formattedEvent).to.contain('DURATION:PT15M')
      expect(formattedEvent).to.contain('ACTION:audio')
      // expect(formattedEvent).to.contain('ATTACH;FMTTYPE=audio/basic:ftp://example.com/pub/sounds/bell-01.aud')
      expect(formattedEvent).to.contain('END:VALARM')
    })
  })
})
