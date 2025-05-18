import mitt from "mitt";

type Events = { 
    activeSound: 'coin' | 'shoot';
    changeState: 'on' | 'off';
    background: string;
}

const eventBus = mitt<Events>();

export default eventBus;