import {defineComponent} from 'vue'

const ZIcon = defineComponent({
  name: 'z-icon',
  props: {
    icon: String
  },
  setup(props) {
    return () => (
      <svg class="icon" aria-hidden="true">
        <use xlinkHref={`#icon-${props.icon}`}/>
      </svg>
    );
  }
})

export default ZIcon
