/* globals describe, it, expect */

import { shallowMount } from '@vue/test-utils';
import app from '../client/components/app.vue';

describe('app.vue', () => {
    it('"Hello world!" should appear.', () => {
        const wrapper = shallowMount(app);
        expect(wrapper.find('.example').text()).toMatch('Hello world!');
    });
});
