import React from 'react'

import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { MoreHorizontal } from 'lucide-react';


const solutions = [
    {
        name: 'Insights',
        description: 'Measure actions your users take',
        href: '##',
    },
    {
        name: 'Automations',
        description: 'Create your own targeted content',
        href: '##',
    },
    {
        name: 'Reports',
        description: 'Keep track of your growth',
        href: '##',
    },
]

export default function Option() {
    return (
        <>
            <div className="w-50 top-16 w-full max-w-sm ">
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <Popover.Button
                                className={`
                ${open ? '' : 'text-opacity-90'}
      
                `}
                            >

                                <MoreHorizontal
                                    className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                                    aria-hidden="true"
                                />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute w-96 ">
                                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">

                                        <div className="bg-gray-50 p-4">

                                            <span className="flex flex-">
                                                <span className="text-sm font-medium text-gray-900">
                                                    <h1>Ações da Lista</h1>
                                                    <ul>

                                                        <li>Adicionar Cartão</li>
                                                        <li>
                                                            Copiar Lista</li>

                                                        <li>Mover Lista</li>
                                                        <li>Seguir</li>
                                                        <li>Ordenar por</li>
                                                        <li>Automação</li>
                                                        <li>Quando um cartão for adicionado à lista</li>
                                                        <li> Todo dia, ordenar a lista por</li>
                                                        <li>Toda segunda-feira, ordenar a lista por</li>
                                                        <li>Criar uma regra</li>
                                                        <li>  Mover Todos os Cartões</li>
                                                        <li> Nesta Lista</li>
                                                        <li> Arquivar Todos os Cartões Nesta Lista</li>
                                                        <li>Arquivar Esta Lista</li>

                                                    </ul>
                                                </span>
                                            </span>

                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </div>
        </>
    )
}

