import React from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import "./Popover.css";

class PopoverItem extends React.Component {
  state = {
    popoverOpen: false,
  };

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <span>
        <Button type="button" 
          className={this.props.className} 
          id={'Popover-' + this.props.id} 
          onClick={this.toggle}>
          {this.props.item.text}
        </Button>
        <Popover 
          placement={this.props.item.placement} 
          isOpen={this.state.popoverOpen} 
          target={'Popover-' + this.props.id} 
          toggle={this.toggle}>
          <PopoverHeader>{this.props.exchange}</PopoverHeader>
          <PopoverBody data-spy="scroll">
          {this.props.description}
          </PopoverBody>
        </Popover>
      </span>
    );
  }
}

export const PopoverLeft = props => (
  <PopoverItem 
    item={{ placement: 'bottom', text: 'Low' }}
    id={props.id + "-left"} 
    exchange={props.lexchange}
    description={props.description}
    className="badge badge-danger low-badge py-1"/>
)

export const PopoverRight = props => (
  <PopoverItem 
    item={{ placement: 'top', text: 'High' }} 
    id={props.id + "-right"} 
    exchange={props.rexchange}
    description={props.description}
    className="badge badge-success high-badge py-1" />
)
