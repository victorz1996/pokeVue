import { shallowMount } from '@vue/test-utils'
import Buscador from "../src/components/Buscador/Buscador.vue"

let cmp

    // eslint-disable-next-line no-undef
    beforeEach(() => {
      cmp = shallowMount(Buscador)
    })
    // eslint-disable-next-line no-undef
    describe('Componente buscador', () => {
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