import { shallowMount } from '@vue/test-utils'
import Loading from "../src/components/Loading/Loading.vue"

let cmp

    // eslint-disable-next-line no-undef
    beforeEach(() => {
      cmp = shallowMount(Loading)
    })
    // eslint-disable-next-line no-undef
    describe('Componente loading', () => {
      // eslint-disable-next-line no-undef
      test('Instancia de Vue.js',() => {
        // eslint-disable-next-line no-undef
        expect(cmp.isVueInstance).toBeTruthy()
      })

      // eslint-disable-next-line no-undef
      it('HTMl renderizado structure esperada',()=>{
        // eslint-disable-next-line no-undef
        expect(cmp.element).toMatchSnapshot()
    })
})