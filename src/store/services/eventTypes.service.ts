import {del, get, post, put} from "../../helpers/apiProxy";
import {CreateEventTypeTyped} from "../types/eventTypes.types";

class EventTypesService {
  public getEventTypes() {
    return get('/event-type');
  }

  public createEventType(eventType: CreateEventTypeTyped) {
    return post('/event-type', eventType);
  }

  public updateEventType(id: number, eventType: CreateEventTypeTyped) {
    return put(`/event-type/${id}`, eventType);
  }

  public deleteEventType(id: number) {
    return del(`/event-type/${id}`);
  }
}

export default EventTypesService;
