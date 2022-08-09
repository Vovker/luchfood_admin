import {del, get, post, put} from "../../helpers/apiProxy";
import {CreateEventsTyped} from "../types/events.types";

class EventsService {
  public getEvents(amount: number, offset: number) {
    return get(`/event/${amount}/${offset}`);
  }

  public getEventsById(id: number) {
    return get(`/event/${id}`);
  }

  public deleteEvent(id: number) {
    return del(`/event/${id}`);
  }

  public createEvent(event: CreateEventsTyped) {
    return post('/event', event);
  }

  public updateEvent(id: number, event: CreateEventsTyped) {
    return put(`/event/${id}`, event);
  }
}

export default EventsService;
