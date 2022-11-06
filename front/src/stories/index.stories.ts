import {storiesOf} from "@storybook/angular"
import {Welcome} from "@storybook/angular/demo"


storiesOf('Welcome', module).add('Default', () => ({
    component: Welcome, 
    props: {}
}));