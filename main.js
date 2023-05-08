import { browserAgent, vuePersistentComponent } from '@knowlearning/agents'
import component from './bettysbrain.vue'

window.Agent = browserAgent()

vuePersistentComponent(component)
