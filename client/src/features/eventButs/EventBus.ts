import mitt from "mitt";

type Events = { 
    changeSoundState: boolean
}

const eventBus = mitt<Events>();

export default eventBus;