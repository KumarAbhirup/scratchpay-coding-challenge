import React from 'react'
import PropTypes from 'prop-types'
import { Table as SemanticTable } from 'semantic-ui-react'

import RolesDropdown, { roleOptions } from './RolesDropdown'
import Checkbox from './Checkbox'
import Editor from './Editor'

export default function SemanticTableBody(props) {
  const { users, onDataChange } = props

  const handleEditorChange = (e, value, currentUser) => {
    const data = users
    data.find(node => node.id === currentUser.id)[e.target.name] = value
    onDataChange([...data])
  }

  return (
    <SemanticTable.Body>
      {users.map(
        user =>
          user && (
            <SemanticTable.Row key={user.id}>
              <SemanticTable.Cell>
                <button
                  type="button"
                  onClick={() => {
                    const data = users
                    delete data[user.id - 1]
                    onDataChange([...data])
                  }}
                >
                  ❌
                </button>
              </SemanticTable.Cell>
              <SemanticTable.Cell>{user.id}</SemanticTable.Cell>
              <SemanticTable.Cell>
                <Checkbox
                  isChecked={user.active}
                  onChange={isChecked => {
                    const data = users
                    data.find(node => node.id === user.id).active = isChecked
                    onDataChange([...data])
                  }}
                />
              </SemanticTable.Cell>
              <SemanticTable.Cell>
                <Editor
                  name="firstName"
                  value={user.firstName}
                  onChange={(e, value) => handleEditorChange(e, value, user)}
                />
              </SemanticTable.Cell>
              <SemanticTable.Cell>
                <Editor
                  name="lastName"
                  value={user.lastName}
                  onChange={(e, value) => handleEditorChange(e, value, user)}
                />
              </SemanticTable.Cell>
              <SemanticTable.Cell>
                <Editor
                  name="email"
                  value={user.email}
                  onChange={(e, value) => handleEditorChange(e, value, user)}
                />
              </SemanticTable.Cell>
              <SemanticTable.Cell>
                <RolesDropdown
                  activeRole={user.role}
                  onChange={role => {
                    const data = users
                    data.find(node => node.id === user.id).role = role
                    onDataChange([...data])
                  }}
                />
              </SemanticTable.Cell>
            </SemanticTable.Row>
          )
      )}
    </SemanticTable.Body>
  )
}

SemanticTableBody.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.number.isRequired,
        active: PropTypes.bool.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        role: PropTypes.oneOf(roleOptions.map(role => role.value)),
      }.isRequired
    )
  ),
  onDataChange: PropTypes.func,
}
