import { AppState } from "../AppState"
import { Event } from "../models/Event"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService{
    async getEvents(){
        const res = await api.get('api/events')
        // logger.log('events:',res.data)
        AppState.events = res.data.map((eventPojo) => new Event(eventPojo))
        logger.log("events in appstate:", AppState.events) 
    }

    async getEventById(eventId){
        AppState.activeEvent = null
        const res = await api.get(`api/events/${eventId}`)
        logger.log(res.data)
        AppState.activeEvent = new Event(res.data)
    }

    async getTicketsOnEvent(eventId){
const res = await api.get(`api/events/${eventId}/tickets`);
logger.log("get tickets on event", res.data)
AppState.tickets = res.data.map((ticket)=> new Ticket(ticket))

    }


    async createTicket(eventId){
        const eventData = {eventId: eventId}
        const res = await api.post('api/tickets', {eventId})
        logger.log("ticket for event", res.data)
        
    }

   async createEvent(eventData){
    const res = await api.post('api/events', eventData)
    logger.log('created this event', res.data)
    const newEvent = new Event(res.data)
    AppState.events.push(newEvent)
    return newEvent
   }

   async cancelEvent(eventId){
    const res = await api.delete(`api/events/${eventId}`)
    logger.log("canceling this event", res.data)
   }
}

export const eventsService = new EventsService()