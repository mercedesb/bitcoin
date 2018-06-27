import React from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class PopoverItem extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        popoverOpen: false
      };
    }
  
    toggle() {
      this.setState({
        popoverOpen: !this.state.popoverOpen
      });
    }
  
    render() {
      return (
        <span>
          <Button type="button" className="badge badge-danger low-badge" id={'Popover-' + this.props.id} onClick={this.toggle}>
            {this.props.item.text}
          </Button>
          <Popover placement={this.props.item.placement} isOpen={this.state.popoverOpen} target={'Popover-' + this.props.id} toggle={this.toggle}>
            <PopoverHeader>Shapeshift</PopoverHeader>
            <PopoverBody>Decentralized Exchange -- Only miner fees; no exhcange fees. Founded in Switzerland by Roger Ver and Barry Silbert. Funded by Bitfinex, Bitcoin Capital, and Mardal Investments. Recent investments by European venture capital firm Earlybird.</PopoverBody>
          </Popover>
        </span>
      );
    }
  }
  
  class PopoverLeftRight extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        popovers: [
          {
            placement: 'left',
            text: 'Left'
          },
          {
            placement: 'right',
            text: 'Right'
          }
        ]
      };
    }
  
    render() {
      return (
        <div>
          { this.state.popovers.map((popover, i) => {
            return <PopoverItem key={i} item={popover} id={i} />;
          })}
        </div>
      );
    }
  }

  export default PopoverLeftRight;