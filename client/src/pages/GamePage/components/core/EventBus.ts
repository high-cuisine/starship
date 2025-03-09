import mitt from "mitt";

type Events = { 
    activeSound: 'coin' | 'shoot';
    changeState: 'on' | 'off'
}

const eventBus = mitt<Events>();

export default eventBus;