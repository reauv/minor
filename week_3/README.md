# Web Apps From Scratch - Week 3

This is a simple Soundcloud application for education purposes 
that uses Redux & React.

## Philosophy
The philosophy behind [Redux](http://redux.js.org) is that application state
is hard to manage and therefore should be seperated from anything else.
JavaScript applications get bigger and bigger, and the interaction gets more
and more complex, so as developers we need tools and guidance on how to handle
this. That's where Redux joins the party.

Redux has 3 main principles that are very important to understand.
- **Single source of truth:** The state of your whole application is stored in an object tree within a single store.
- **State is read-only:** The only way to mutate the state is to emit an action, an object describing what happened.
- **Changes are made with pure functions:** To specify how the state tree is transformed by actions, you write pure reducers.

## Application flow
So how does this philosophy and those 3 principles translate themself in an
application flow that should be followed to keep you as developer sane and
your application state easy to maintain?

![Redux flow](https://raw.githubusercontent.com/Swift-Flow/Swift-Flow/0.2.2/Readme/Assets/swift_flow_concept.png)

In the picture above you can see the flow in action. As you can see it's a one
way street, also called _unidirectional data flow_. This is very important and
makes everything so much easier to reason about.

So if there is something that's going to update the application, let's say a user
clicks a button. Then there is an event listener on that button, this event listener
is going to dispatch an action. This action has a name, and optionally a payload with data.
Now, that action is being dispatched by the store and the store is going to create a 
**new** state (really important to understand that it's a new state, not an updated state)
by passing the old state, and the payload of the action to the reducers. These
reducers return a new state, which the store passes down to the views that are
subscribed. If there is a relevant data changed, React re-renders automatically.
