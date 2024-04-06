import getStatusById from '../util/getStatus';
import * as constants from '../util/Constants';

export const initialState = {
    name: "Roy",
    age: 0,
    tick: 0,
    event: {
        isEvent: false,
        eventId: 0
    },
    isBored: false,
    isHere: true,
    timeSick: 0,
    tolerance: 0,
    hp: 100,
    hunger: 0,
    tiredness: 0,
    anger: 0,
    love: 0,
    status: getStatusById(1),
    isMedicine: false,
    isAsleep: false,
    prevAction: {
        type: "",
        time: Date.now()
    },
    inventory: [],
    messages: []
}
  
const TamagotchiReducer = (state, action) => {
    const { type, payload={} } = action;

    const incrementTolerance = (action) => {
        if (state.prevAction.type === action) {
            return Math.min(state.tolerance + 20, constants.MAX_TOLERANCE);
        } else {
            return 0;
        }
    }

    const setPrevAction = (type) => ({type: type, time: Date.now()})
  
    switch (type) {
        case 'GIVE_FOOD': {
            console.log("GIVE_FOOD", payload)
  
            return {
                ...state,
                hp: payload.hp,
                isBored: false,
                tolerance: incrementTolerance(type),
                hunger: payload.hunger,
                status: payload.status,
                prevAction: setPrevAction(type),
                messages: payload.messages
            };  
        }
        case 'GIVE_MEDICINE': {
            console.log("GIVE_MEDICINE", payload)

            return {
                ...state,
                timeSick: 0,
                hp: payload.hp,
                isBored: false,
                status: payload.status,
                prevAction: setPrevAction(type),
                messages: payload.messages
            }
        }
        case 'DO_PET': {
            console.log("DO_PET", payload)

            return {
                ...state,
                isBored: false,
                tolerance: incrementTolerance(type),
                tiredness: payload.tiredness,
                love: payload.love,
                prevAction: setPrevAction(type),
                messages: payload.messages
            }
        }
        case 'DO_SLEEP': {
            console.log("DO_SLEEP", payload)

            return {
                ...state,
                hp: constants.MAX_HP,
                isBored: false,
                tiredness: payload.tiredness,
                tolerance: payload.tolerance,
                isAsleep: true,
                prevAction: setPrevAction(type),
                messages: payload.messages
            }
        }
        case 'DO_WAKE': {
            return {
                ...state,
                isAsleep: false,
                prevAction: setPrevAction(type),
                messages: []
            }
        }
        case 'GET_STATUS': {
            console.log(state);

            return {
                ...state,
                prevAction: setPrevAction(type),
                messages: payload.messages
            }
        }
        case 'PUT_STATUS': {
            return {
                ...state,
                messages: payload.messages
            }
        }
        case 'GET_TOY': {
            console.log("GET_TOY", payload)

            const newInv = Array.from(state.inventory ?? []);
            newInv.push(payload.inventory);
            
            return {
                ...state,
                inventory: newInv
            }
        }
        case 'DO_PLAY_WITH_TOY': {
            return {
                ...state,
                isBored: false,
                tiredness: 0,
                love: state.love + 5,
                prevAction: setPrevAction(type),
                messages: payload.messages,
            }
        }
        case 'SET_IS_MEDICINE': {
            return {
                ...state,
                prevAction: setPrevAction(type),
                isMedicine: payload.isMedicine
            }
        }
        case 'INCREMENT_AGE': {
            if (state.status.isSick) {
                return {
                    ...state,
                    age: state.age + 1,
                    timeSick: state.timeSick + 1,
                    hp: Math.max(state.hp - state.status.effect.hp, 0),
                    tiredness: Math.min(state.tiredness + state.status.effect.tiredness, constants.MAX_TIREDNESS)
                } 
            } else {
                return {
                    ...state,
                    age: state.age + 1
                }
            }
        }
        case 'SET_TICK': {
            return {
                ...state,
                tick: state.tick + 1
            }
        }
        case 'REMOVE_TICK': {
            return {
                ...state,
                tick: 0
            }
        }
        case 'SET_EVENT': {
            return {
                ...state,
                prevAction: setPrevAction("SET_EVENT"),
                event: {
                    isEvent: true,
                    eventId: 1
                }
            }
        }
        case 'REMOVE_EVENT': {
            return {
                ...state,
                event: {
                    isEvent: false,
                    eventId: 0
                }
            }
        }
        case 'SET_IS_BORED': {
            return {
                ...state,
                isBored: true,
                messages: payload.messages
            }
        }
        case 'REMOVE_IS_BORED': {
            return {
                ...state,
                isBored: false
            }
        }
        case 'SET_IS_AWAY': {
            return {
                ...state,
                isHere: false,
                prevAction: setPrevAction(type),
                messages: payload.messages
            }
        }
        case 'SET_IS_HERE': {
            return {
                ...state,
                isHere: true,
                prevAction: setPrevAction(type),
                messages: payload.messages
            }
        }
        default:
            throw new Error(`No case for type ${type} found in TamagotchiReducer.`);
    }
}

export default TamagotchiReducer;